'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Send } from 'lucide-react'
import { useState } from 'react'

interface ChatMessage {
  id: string
  user: string
  avatar: string
  message: string
  timestamp: string
}

interface ChatPanelProps {
  messages?: ChatMessage[]
}

export function ChatPanel({ messages = [] }: ChatPanelProps) {
  const [input, setInput] = useState('')

  const defaultMessages: ChatMessage[] = [
    {
      id: '1',
      user: 'starkelaling',
      avatar: '/placeholder-user.jpg',
      message: 'Women',
      timestamp: 'now',
    },
    {
      id: '2',
      user: 'heschristie',
      avatar: '/placeholder-user.jpg',
      message: 'Good girl?',
      timestamp: '2m ago',
    },
    {
      id: '3',
      user: 'oceandrew',
      avatar: '/placeholder-user.jpg',
      message: 'Any ones that smell like santal and creed?',
      timestamp: '5m ago',
    },
    {
      id: '4',
      user: 'donashriee97',
      avatar: '/placeholder-user.jpg',
      message: 'Do u have my way',
      timestamp: '8m ago',
    },
    {
      id: '5',
      user: 'marver35548',
      avatar: '/placeholder-user.jpg',
      message: 'Thank you',
      timestamp: '10m ago',
    },
  ]

  const displayMessages = messages.length > 0 ? messages : defaultMessages

  return (
    <Card className="bg-card border-border p-4 h-[600px] flex flex-col">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground text-sm">Chat</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {displayMessages.map((msg) => (
          <div key={msg.id} className="flex gap-2 text-sm">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.user} />
              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                {msg.user.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-xs">{msg.user}</p>
              <p className="text-foreground/80 text-xs break-words">
                {msg.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 border-t border-border pt-3">
        <Input
          placeholder="Say something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-muted/50 border-border text-sm h-9"
        />
        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 h-9"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
