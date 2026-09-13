'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

function ToolbarBtn({ active, onClick, children, title }: {
  active?: boolean; onClick: () => void; children: React.ReactNode; title: string
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={e => { e.preventDefault(); onClick() }}
      className={`flex h-7 w-7 items-center justify-center rounded text-xs font-semibold transition ${
        active
          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400'
          : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
  )
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    onUpdate({ editor }) {
      const html = editor.isEmpty ? '' : editor.getHTML()
      onChange(html)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none min-h-[80px] outline-none px-4 py-3 text-sm text-slate-700 dark:text-slate-200',
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    if (value === '' && !editor.isEmpty) editor.commands.clearContent()
  }, [value, editor])

  if (!editor) return null

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-400 dark:border-slate-700 dark:bg-slate-800">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 border-b border-slate-100 px-2 py-1.5 dark:border-slate-700">
        <ToolbarBtn
          title="Bold"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <span className="font-bold">B</span>
        </ToolbarBtn>

        <ToolbarBtn
          title="Italic"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <span className="italic">I</span>
        </ToolbarBtn>

        <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-slate-600" />

        <ToolbarBtn
          title="Bullet List"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5">
            <circle cx="2.5" cy="4.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="2.5" cy="8" r="1" fill="currentColor" stroke="none" />
            <circle cx="2.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
            <line x1="5" y1="4.5" x2="14" y2="4.5" />
            <line x1="5" y1="8" x2="14" y2="8" />
            <line x1="5" y1="11.5" x2="14" y2="11.5" />
          </svg>
        </ToolbarBtn>

        <ToolbarBtn
          title="Numbered List"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5">
            <text x="1" y="6" fontSize="5" fill="currentColor" stroke="none" fontWeight="700">1.</text>
            <text x="1" y="10" fontSize="5" fill="currentColor" stroke="none" fontWeight="700">2.</text>
            <text x="1" y="14" fontSize="5" fill="currentColor" stroke="none" fontWeight="700">3.</text>
            <line x1="7" y1="4.5" x2="14" y2="4.5" />
            <line x1="7" y1="8.5" x2="14" y2="8.5" />
            <line x1="7" y1="12.5" x2="14" y2="12.5" />
          </svg>
        </ToolbarBtn>
      </div>

      {/* Editor area */}
      <div className="relative">
        {editor.isEmpty && placeholder && (
          <p className="pointer-events-none absolute left-4 top-3 text-sm text-slate-400 dark:text-slate-500 select-none">
            {placeholder}
          </p>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
