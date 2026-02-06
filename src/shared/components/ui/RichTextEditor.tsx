'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/shared/utils/cn';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Import Quill CSS
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export const RichTextEditor = ({
    value,
    onChange,
    placeholder = 'Enter description...',
    disabled = false,
    className,
}: RichTextEditorProps) => {
    // Customize toolbar
    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link'],
                ['clean'],
            ],
        }),
        []
    );

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'color',
        'background',
        'list',
        'bullet',
        'link',
    ];

    return (
        <div className={cn('rich-text-editor', className)}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                readOnly={disabled}
                className={cn('bg-white rounded-lg', disabled && 'opacity-60 cursor-not-allowed')}
            />
            <style jsx global>{`
                .rich-text-editor .ql-container {
                    font-size: 1rem;
                    font-family: inherit;
                    min-height: 200px;
                }
                .rich-text-editor .ql-editor {
                    min-height: 200px;
                    padding: 1rem;
                }
                .rich-text-editor .ql-toolbar {
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                    border: 1px solid #d1d5db;
                    border-bottom: none;
                }
                .rich-text-editor .ql-container {
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                    border: 1px solid #d1d5db;
                    border-top: none;
                }
                .rich-text-editor .ql-editor.ql-blank::before {
                    color: #9ca3af;
                    font-style: normal;
                }
                .rich-text-editor .ql-editor:focus {
                    outline: none;
                }
                .rich-text-editor .ql-toolbar .ql-stroke {
                    stroke: #374151;
                }
                .rich-text-editor .ql-toolbar .ql-fill {
                    fill: #374151;
                }
                .rich-text-editor .ql-toolbar button:hover,
                .rich-text-editor .ql-toolbar button.ql-active {
                    color: #3b82f6;
                }
                .rich-text-editor .ql-toolbar button:hover .ql-stroke,
                .rich-text-editor .ql-toolbar button.ql-active .ql-stroke {
                    stroke: #3b82f6;
                }
                .rich-text-editor .ql-toolbar button:hover .ql-fill,
                .rich-text-editor .ql-toolbar button.ql-active .ql-fill {
                    fill: #3b82f6;
                }
            `}</style>
        </div>
    );
};
