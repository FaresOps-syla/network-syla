'use client';

import { useState } from 'react';
import {
  MessageSquare,
  Plus,
  Send,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Headphones,
  Calendar,
  Tag,
  Image as ImageIcon,
  X,
  Paperclip,
  File,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TicketStatus = 'open' | 'in_progress' | 'resolved';

interface Ticket {
  id: string;
  subject: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  category: string;
  preview: string;
  iccid?: string;
}

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string; // In real app, this would be a server URL
  preview?: string; // For images
}

interface TicketMessage {
  id: string;
  ticketId: string;
  author: 'user' | 'support';
  authorName: string;
  body: string;
  createdAt: string;
  attachments?: FileAttachment[];
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    subject: 'Problème d\'activation eSIM iPhone 15',
    status: 'in_progress',
    createdAt: '2024-01-15T10:30:00',
    updatedAt: '2024-01-16T14:20:00',
    category: 'Technical',
    preview: 'Bonjour, je n\'arrive pas à activer mon eSIM sur mon iPhone 15...',
  },
  {
    id: '2',
    subject: 'Facturation - demande de reçu',
    status: 'resolved',
    createdAt: '2024-01-10T09:00:00',
    updatedAt: '2024-01-12T11:00:00',
    category: 'Billing',
    preview: 'Je souhaiterais recevoir un reçu pour ma dernière facture...',
  },
  {
    id: '3',
    subject: 'Forfait données épuisé avant la fin du mois',
    status: 'open',
    createdAt: '2024-01-18T16:45:00',
    updatedAt: '2024-01-18T16:45:00',
    category: 'Account',
    preview: 'Mon forfait de 10 Go a été épuisé en 2 semaines. Y a-t-il...',
  },
];

const mockMessages: TicketMessage[] = [
  {
    id: 'm1',
    ticketId: '1',
    author: 'user',
    authorName: 'Vous',
    body: 'Bonjour, je n\'arrive pas à activer mon eSIM sur mon iPhone 15. J\'ai scanné le QR code mais rien ne se passe. Pouvez-vous m\'aider ?',
    createdAt: '2024-01-15T10:30:00',
  },
  {
    id: 'm2',
    ticketId: '1',
    author: 'support',
    authorName: 'Support SYLA',
    body: 'Bonjour, merci de nous avoir contactés. Pouvez-vous vérifier que l\'itinérance de données est activée dans Réglages > Données cellulaires ? Ensuite, essayez de redémarrer votre appareil et de rescanner le QR code.',
    createdAt: '2024-01-15T14:00:00',
  },
  {
    id: 'm3',
    ticketId: '1',
    author: 'user',
    authorName: 'Vous',
    body: 'J\'ai fait ce que vous avez dit et ça a fonctionné. Merci beaucoup !',
    createdAt: '2024-01-16T09:15:00',
  },
  {
    id: 'm4',
    ticketId: '1',
    author: 'support',
    authorName: 'Support SYLA',
    body: 'Nous sommes ravis que cela fonctionne. N\'hésitez pas à nous recontacter si vous avez d\'autres questions. Bonne journée !',
    createdAt: '2024-01-16T14:20:00',
  },
];

const statusConfig: Record<TicketStatus, { label: string; icon: typeof Clock; className: string }> = {
  open: { label: 'Ouvert', icon: Clock, className: 'bg-amber-100 text-amber-800' },
  in_progress: { label: 'En cours', icon: AlertCircle, className: 'bg-blue-100 text-blue-800' },
  resolved: { label: 'Résolu', icon: CheckCircle2, className: 'bg-green-100 text-green-800' },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return `Il y a ${diffDays} j.`;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export default function HelpPage() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [messages, setMessages] = useState<TicketMessage[]>(mockMessages);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState('Technical');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [newTicketFiles, setNewTicketFiles] = useState<File[]>([]);
  const [newTicketIccid, setNewTicketIccid] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyFiles, setReplyFiles] = useState<File[]>([]);

  const selectedTicket = selectedTicketId ? tickets.find((t) => t.id === selectedTicketId) : null;
  const selectedMessages = selectedTicketId
    ? messages.filter((m) => m.ticketId === selectedTicketId)
    : [];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isReply: boolean = false) => {
    const files = Array.from(e.target.files || []);
    if (isReply) {
      setReplyFiles((prev) => [...prev, ...files]);
    } else {
      setNewTicketFiles((prev) => [...prev, ...files]);
    }
  };

  const removeFile = (index: number, isReply: boolean = false) => {
    if (isReply) {
      setReplyFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      setNewTicketFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const createFileAttachments = (files: File[]): FileAttachment[] => {
    return files.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return;
    const newTicket: Ticket = {
      id: String(tickets.length + 1),
      subject: newTicketSubject,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: newTicketCategory,
      preview: newTicketMessage.slice(0, 60) + (newTicketMessage.length > 60 ? '...' : ''),
      iccid: newTicketCategory === 'eSIM' && newTicketIccid.trim() ? newTicketIccid.trim() : undefined,
    };
    const attachments = createFileAttachments(newTicketFiles);
    const newMsg: TicketMessage = {
      id: 'm' + Date.now(),
      ticketId: newTicket.id,
      author: 'user',
      authorName: 'Vous',
      body: newTicketMessage,
      createdAt: newTicket.createdAt,
      attachments: attachments.length > 0 ? attachments : undefined,
    };
    setTickets((prev) => [newTicket, ...prev]);
    setMessages((prev) => [...prev, newMsg]);
    setSelectedTicketId(newTicket.id);
    setShowCreateForm(false);
    setNewTicketSubject('');
    setNewTicketMessage('');
    setNewTicketFiles([]);
    setNewTicketIccid('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicketId) return;
    const attachments = createFileAttachments(replyFiles);
    const newMsg: TicketMessage = {
      id: 'm' + Date.now(),
      ticketId: selectedTicketId,
      author: 'user',
      authorName: 'Vous',
      body: replyText,
      createdAt: new Date().toISOString(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };
    setMessages((prev) => [...prev, newMsg]);
    setReplyText('');
    setReplyFiles([]);
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicketId
          ? { ...t, updatedAt: newMsg.createdAt, preview: replyText.slice(0, 60) + (replyText.length > 60 ? '...' : '') }
          : t
      )
    );
  };

  const openCreateForm = () => {
    setShowCreateForm(true);
    setSelectedTicketId(null);
  };

  const openTicket = (id: string) => {
    setSelectedTicketId(id);
    setShowCreateForm(false);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-[400px] gap-0 border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Left: Ticket list - w-1/3 */}
      <div className="w-1/3 flex flex-col border-r border-gray-200 bg-gray-50/50">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Vos tickets</h2>
            <button
              onClick={openCreateForm}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nouveau
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {tickets.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              <MessageSquare className="w-10 h-10 mx-auto mb-2 text-gray-400" />
              Aucun ticket. Créez-en un pour commencer.
            </div>
          ) : (
            <ul className="p-2">
              {tickets.map((ticket) => {
                const status = statusConfig[ticket.status];
                const StatusIcon = status.icon;
                return (
                  <li key={ticket.id}>
                    <button
                      onClick={() => openTicket(ticket.id)}
                      className={cn(
                        'w-full text-left p-3 rounded-lg mb-1 transition-colors',
                        selectedTicketId === ticket.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate flex-1">
                          {ticket.subject}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ticket.preview}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium',
                            status.className
                          )}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {formatDate(ticket.updatedAt)}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Right: Create form OR ticket conversation */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        {showCreateForm ? (
          /* Create new ticket form */
          <div className="flex flex-col h-full p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ouvrir un nouveau ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                <input
                  type="text"
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  placeholder="Résumez votre demande en quelques mots"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <select
                  value={newTicketCategory}
                  onChange={(e) => {
                    setNewTicketCategory(e.target.value);
                    if (e.target.value !== 'eSIM') {
                      setNewTicketIccid('');
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                >
                  <option value="Technical">Technique</option>
                  <option value="Billing">Facturation</option>
                  <option value="Account">Compte</option>
                  <option value="eSIM">eSIM</option>
                  <option value="Other">Autre</option>
                </select>
              </div>
              
              {/* ICCID Field - Only show when category is eSIM */}
              {newTicketCategory === 'eSIM' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ICCID <span className="text-gray-400 font-normal">(optionnel)</span>
                  </label>
                  <input
                    type="text"
                    value={newTicketIccid}
                    onChange={(e) => setNewTicketIccid(e.target.value)}
                    placeholder="Entrez l'ICCID de votre eSIM (ex: 8901...)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm font-mono"
                    pattern="[0-9]{19,20}"
                    maxLength={20}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    L'ICCID est un numéro à 19-20 chiffres unique à votre eSIM
                  </p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  placeholder="Décrivez votre problème ou question en détail..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm resize-none"
                  required
                />
              </div>
              
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pièces jointes (captures d'écran, fichiers)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="ticket-file-upload"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, false)}
                    className="hidden"
                  />
                  <label
                    htmlFor="ticket-file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Paperclip className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 mb-1">
                      Cliquez pour ajouter des fichiers ou glissez-déposez
                    </span>
                    <span className="text-xs text-gray-400">
                      Images, PDF, DOC (max 10MB par fichier)
                    </span>
                  </label>
                </div>
                
                {/* File Preview */}
                {newTicketFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {newTicketFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        {file.type.startsWith('image/') ? (
                          <div className="w-12 h-12 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <File className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index, false)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Envoyer le ticket
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        ) : selectedTicket ? (
          /* Ticket conversation */
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">{selectedTicket.category}</span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
                    statusConfig[selectedTicket.status].className
                  )}
                >
                  {(() => {
                    const Icon = statusConfig[selectedTicket.status].icon;
                    return <Icon className="w-3 h-3" />;
                  })()}
                  {statusConfig[selectedTicket.status].label}
                </span>
                <span className="text-xs text-gray-400 ml-auto">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {new Date(selectedTicket.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mt-2">{selectedTicket.subject}</h3>
              {selectedTicket.iccid && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">ICCID:</span>
                  <span className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {selectedTicket.iccid}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex gap-3',
                    msg.author === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[85%] rounded-lg px-4 py-3',
                      msg.author === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.author === 'support' ? (
                        <Headphones className="w-4 h-4 text-gray-500" />
                      ) : (
                        <User className="w-4 h-4 text-blue-200" />
                      )}
                      <span className="text-xs font-medium opacity-90">{msg.authorName}</span>
                      <span className="text-xs opacity-75">
                        {new Date(msg.createdAt).toLocaleString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{msg.body}</p>
                    
                    {/* Attachments */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className={cn(
                              'flex items-center gap-2 p-2 rounded border',
                              msg.author === 'user'
                                ? 'bg-blue-500/20 border-blue-300/30'
                                : 'bg-gray-200 border-gray-300'
                            )}
                          >
                            {attachment.preview ? (
                              <div className="w-12 h-12 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                                <img
                                  src={attachment.preview}
                                  alt={attachment.name}
                                  className="w-full h-full object-cover cursor-pointer"
                                  onClick={() => window.open(attachment.url, '_blank')}
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
                                <File className="w-6 h-6 text-gray-500" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{attachment.name}</p>
                              <p className="text-xs opacity-75">
                                {(attachment.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <a
                              href={attachment.url}
                              download={attachment.name}
                              className="p-1 hover:bg-black/10 rounded transition-colors"
                            >
                              <Paperclip className="w-4 h-4" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {selectedTicket.status !== 'resolved' && (
              <form
                onSubmit={handleSendReply}
                className="p-4 border-t border-gray-200 flex-shrink-0 space-y-3"
              >
                {/* File Preview for Reply */}
                {replyFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {replyFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        {file.type.startsWith('image/') ? (
                          <div className="w-10 h-10 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <File className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index, true)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <X className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <div className="flex-1 flex flex-col gap-2">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Répondre au ticket..."
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm resize-none"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        id="reply-file-upload"
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(e, true)}
                        className="hidden"
                      />
                      <label
                        htmlFor="reply-file-upload"
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                      >
                        <Paperclip className="w-4 h-4" />
                        <span>Ajouter des fichiers</span>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!replyText.trim() && replyFiles.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-end"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Empty state: no ticket selected, not creating */
          <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-500">
            <div>
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="font-medium text-gray-600">Sélectionnez un ticket</p>
              <p className="text-sm mt-1">ou créez-en un nouveau depuis la liste à gauche.</p>
              <button
                onClick={openCreateForm}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nouveau ticket
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
