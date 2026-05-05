import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { checkHealth, getContacts } from './api/client';
import { getAIReply } from './aiTemplates.ts';

type Contact = {
  id: number;
  name: string;
  phone: string;
  lastMessage: string;
  avatar: string;
  unread?: number;
  online?: boolean;
};

type Message = {
  id: number;
  text: string;
  time: string;
  me: boolean;
  status?: 'sent' | 'delivered' | 'read';
};

export default function ChatApp() {
  const [backendOk, setBackendOk] = useState(false);
  const [socketOk, setSocketOk] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('inbox');
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const colors = {
    bg: '#0B141A',
    panel: '#111B21',
    header: '#202C33',
    active: '#2A3942',
    input: '#2A3942',
    text: '#E9EDEF',
    subtext: '#8696A0',
    green: '#25D366',
    myMsg: '#005C4B',
    theirMsg: '#202C33',
    border: '#222D34'
  };

  useEffect(() => {
    checkHealth().then(() => setBackendOk(true)).catch(() => setBackendOk(false));

    getContacts().then(res => {
      const data = res.data.map((c: any) => ({
      ...c,
        avatar: c.avatar || c.name.substring(0, 2).toUpperCase(),
        online: Math.random() > 0.5,
        unread: Math.floor(Math.random() * 3)
      }));
      setContacts(data);
      if (data.length > 0) setSelectedContact(data[0]);
    }).catch(() => {
      const demo = [
        {id:1, name:'Priya', phone:'919999', lastMessage:'Price enna?', avatar:'PR', online:true, unread:2},
        {id:2, name:'Arun', phone:'918888', lastMessage:'Delivery when?', avatar:'AR', online:false, unread:0},
      ];
      setContacts(demo);
      setSelectedContact(demo[0]);
    });

    const socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
      withCredentials: false,
    });
    socketRef.current = socket;
    socket.on('connect', () => setSocketOk(true));
    socket.on('disconnect', () => setSocketOk(false));
    return () => { socket.disconnect(); };
  }, []);

  useEffect(() => {
    if (selectedContact) {
      setMessages([
        { id: 1, text: 'Hi! How can I help you today?', time: '10:24 AM', me: false },
        { id: 2, text: 'I want to check my order status', time: '10:25 AM', me: true, status: 'read' },
        { id: 3, text: 'Sure! Your order #101 is being prepared', time: '10:26 AM', me: false },
        { id: 4, text: selectedContact.lastMessage, time: '10:30 AM', me: false },
      ]);
    }
  }, [selectedContact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() ||!selectedContact) return;
    const msg: Message = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      me: true,
      status: 'sent'
    };
    setMessages(prev => [...prev, msg]);
    const userText = newMessage.toLowerCase();
    setNewMessage('');

    setTimeout(() => {
      let category = 'greeting';
      if (userText.includes('price') || userText.includes('rate') || userText.includes('enna')) category = 'price';
      else if (userText.includes('size') || userText.includes('stock') || userText.includes('irukka')) category = 'size';
      else if (userText.includes('cod') || userText.includes('cash')) category = 'cod';
      else if (userText.includes('ship') || userText.includes('delivery')) category = 'delivery';

      const aiReply = getAIReply(category, { product: 'kurti', price: '1299', size: 'M' });
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: aiReply,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        me: false
      }]);
    }, 1000);
  };

  const sidebarItems = [
    { id: 'inbox', label: 'Inbox', icon: '💬', count: 2 },
    { id: 'contacts', label: 'Contacts', icon: '👥', count: 0 },
    { id: 'orders', label: 'Orders', icon: '📦', count: 0 },
    { id: 'broadcast', label: 'Broadcast', icon: '📢', count: 0 },
  ];

  return (
    <div className="h-screen flex overflow-hidden" style={{backgroundColor: colors.bg, color: colors.text, fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif'}}>
      <div className="w-16 flex flex-col items-center py-4 gap-4" style={{backgroundColor: colors.panel, borderRight: `1px solid ${colors.border}`}}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-black" style={{backgroundColor: colors.green}}>W</div>
        <nav className="flex-1 flex flex-col gap-2">
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{backgroundColor: activeTab === item.id? colors.header : 'transparent', color: activeTab === item.id? colors.green : colors.subtext}}>
              <span className="text-xl">{item.icon}</span>
            </button>
          ))}
        </nav>
        <div className="flex flex-col items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{backgroundColor: backendOk? colors.green : '#ef4444'}} title="Backend" />
          <div className="w-2 h-2 rounded-full" style={{backgroundColor: socketOk? colors.green : '#ef4444'}} title="Socket" />
        </div>
      </div>

      <div className="w-80 flex flex-col" style={{backgroundColor: colors.panel, borderRight: `1px solid ${colors.border}`}}>
        <div className="h-14 px-4 flex items-center" style={{backgroundColor: colors.header}}>
          <h1 className="font-medium text-lg">Chats</h1>
        </div>
        <div className="p-3">
          <input placeholder="Search" className="w-full h-9 rounded-lg px-3 text-sm"
            style={{backgroundColor: colors.header, color: colors.text, outline:'none'}} />
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map(contact => (
            <button key={contact.id} onClick={() => setSelectedContact(contact)}
              className="w-full flex items-center gap-3 px-3 py-3 hover:opacity-80"
              style={{backgroundColor: selectedContact?.id === contact.id? colors.active : 'transparent'}}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm" style={{backgroundColor: colors.header}}>
                {contact.avatar}
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between">
                  <span className="text-sm">{contact.name}</span>
                  <span className="text-xs" style={{color: colors.subtext}}>10:30</span>
                </div>
                <div className="text-sm truncate" style={{color: colors.subtext}}>{contact.lastMessage}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col" style={{backgroundColor: colors.bg}}>
        {selectedContact && (
          <>
            <div className="h-14 px-4 flex items-center" style={{backgroundColor: colors.header}}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{backgroundColor: colors.panel}}>
                {selectedContact.avatar}
              </div>
              <div>
                <div className="text-sm font-medium">{selectedContact.name}</div>
                <div className="text-xs" style={{color: colors.subtext}}>{selectedContact.online? 'online' : 'offline'}</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-3xl mx-auto space-y-2">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.me? 'justify-end' : 'justify-start'}`}>
                    <div className="px-3 py-2 rounded-lg max-w-[65%]" style={{backgroundColor: msg.me? colors.myMsg : colors.theirMsg}}>
                      <p className="text- pr-8">{msg.text}</p>
                      <div className="text-right -mt-1">
                        <span className="text-" style={{color: colors.subtext}}>{msg.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="p-3 flex gap-3" style={{backgroundColor: colors.header}}>
              <input value={newMessage} onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message" className="flex-1 h-10 rounded-lg px-4 text-sm"
                style={{backgroundColor: colors.input, color: colors.text, outline:'none'}} />
              <button onClick={sendMessage} className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{backgroundColor: colors.green}}>
                <span className="text-black">➤</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}