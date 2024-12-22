import { useChatWithChapter } from '@/api/apiHooks/llm-generation/llm-generation';
import { GetChapterResponse, History } from '@/api/apiSchemas';
import { Button } from '@/components/ui/button';
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import {
  ExpandableChat,
  ExpandableChatBody,
  ExpandableChatFooter,
  ExpandableChatHeader,
} from '@/components/ui/chat/expandable-chat';
import { Lightbulb, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
type ChatWithChapterProps = {
  chapter: GetChapterResponse | undefined;
};

const ChatWithChapter = ({ chapter }: ChatWithChapterProps) => {
  const [messages, setMessages] = useState<History[]>([]);
  const [message, setMessage] = useState('');
  const { mutateAsync, isPending } = useChatWithChapter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: message,
        user_type: 'user',
      },
    ]);

    await mutateAsync(
      {
        id: chapter?.id as number,
        data: {
          history: messages,
          message: message,
        },
      },
      {
        onSuccess: (data: any) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              message: data.response,
              user_type: 'bot',
            },
          ]);
        },
        onError: () => {
          setMessages((prevMessages) => prevMessages.slice(0, -1));
        },
        onSettled: () => {
          setMessage('');
        },
      }
    );
  };

  return (
    <div>
      <ExpandableChat size="md" position="bottom-right" icon={<Sparkles />}>
        <ExpandableChatHeader className="flex-col text-center justify-center">
          <h1 className="text-xl font-semibold">Chat with Syllabus AI ✨</h1>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text font-bold text-primary">{chapter?.title}</h2>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Ask anything about this chapter
                </p>
              </div>
            </div>
          </div>
        </ExpandableChatHeader>
        <ExpandableChatBody>
          <ChatMessageList className="dark:bg-muted/40">
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage>
                Hey there👋, ask me anything you want to know more about this
                chapter.
              </ChatBubbleMessage>
            </ChatBubble>

            {messages.map((msg, index) => (
              <ChatBubble
                key={index}
                variant={msg.user_type === 'user' ? 'sent' : 'received'}
              >
                <ChatBubbleAvatar fallback="AI" />
                <ChatBubbleMessage>{msg.message}</ChatBubbleMessage>
              </ChatBubble>
            ))}
            {isPending && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" />
                <ChatBubbleMessage>
                  <span className="animate-pulse">Typing...</span>
                </ChatBubbleMessage>
              </ChatBubble>
            )}
          </ChatMessageList>
        </ExpandableChatBody>
        <ExpandableChatFooter>
          <form className="flex relative gap-2" onSubmit={handleSubmit}>
            <ChatInput
              className="min-h-12 bg-background shadow-none "
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="absolute top-1/2 right-2 transform size-8 -translate-y-1/2"
              size="icon"
              type="submit"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </ExpandableChatFooter>
      </ExpandableChat>
    </div>
  );
};

export default ChatWithChapter;
