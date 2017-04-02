package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"

	log "github.com/Sirupsen/logrus"
)

// TODO: Create operation for creating new rooms
var AllRooms = NewRoomManager()

var (
	ErrRoomNotFound = errors.New("Error: Room not found")
)

type RoomManager struct {
	lock  sync.RWMutex
	rooms map[string]*Room // map[miniLockID]*Room
}

func NewRoomManager() *RoomManager {
	return &RoomManager{
		rooms: map[string]*Room{},
	}
}

func (rm *RoomManager) GetRoom(token string) (*Room, error) {
	rm.lock.RLock()
	defer rm.lock.RUnlock()

	room, ok := rm.rooms[token]
	if !ok {
		return nil, ErrRoomNotFound
	}
	return room, nil
}

type Room struct {
	ID       string // miniLock ID
	Clients  []*Client
	messages []Message

	clientLock sync.RWMutex
	msgLock    sync.RWMutex
}

func (r *Room) GetMessages() []Message {
	r.msgLock.RLock()
	defer r.msgLock.RUnlock()

	newMsgs := make([]Message, len(r.messages))
	copy(newMsgs, r.messages)
	return newMsgs
}

func (r *Room) AddMessages(msgs []Message) {
	r.msgLock.Lock()
	defer r.msgLock.Unlock()

	r.messages = append(r.messages, msgs...)
}

func (r *Room) AddClient(c *Client) {
	r.clientLock.Lock()
	defer r.clientLock.Unlock()

	r.Clients = append(r.Clients, c)
}

func (r *Room) RemoveClient(c *Client) {
	r.clientLock.Lock()
	defer r.clientLock.Unlock()

	for i, client := range r.Clients {
		if client == c {
			r.Clients = append(r.Clients[:i], r.Clients[i+1:]...)
			break
		}
	}
}

// If it is a message from the room, make the sender nil.
func (r *Room) BroadcastMessages(sender *Client, msgs ...Message) {
	r.clientLock.RLock()
	defer r.clientLock.RUnlock()

	for _, client := range r.Clients {
		if client != sender {
			go func() {
				err := client.SendMessages(msgs...)
				if err != nil {
					log.Debugf("Error sending message. Err: %s", err)
				}
			}()
		}
	}
}

type Client struct {
	wsConn    *websocket.Conn
	writeLock sync.Mutex

	httpW   http.ResponseWriter
	httpReq *http.Request

	room *Room
}

func (c *Client) SendMessages(msgs ...Message) error {
	c.writeLock.Lock()
	defer c.writeLock.Unlock()
	outgoing := OutgoingPayload{Ephemeral: msgs}

	body, err := json.Marshal(outgoing)
	if err != nil {
		return err
	}

	err = c.wsConn.WriteMessage(websocket.TextMessage, body)
	if err != nil {
		log.Debugf("Error sending message to client. Removing client from room. Err: %s", err)
		c.room.RemoveClient(c)
		return err
	}

	return nil
}
