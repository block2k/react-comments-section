import React, { useState, useEffect } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useContext } from 'react'
import { GlobalContext } from '../../context/Provider'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

interface AdvancedInputProps {
  formStyle?: object
  handleSubmit: Function
  mode?: string
  cancelBtnStyle?: object
  submitBtnStyle?: object
  comId?: string
  imgStyle?: object
  imgDiv?: object
  customImg?: string
  text: string
}

const AdvancedInput = ({
  formStyle,
  handleSubmit,
  submitBtnStyle,
  cancelBtnStyle,
  mode,
  comId,
  text
}: AdvancedInputProps) => {
  const [html, setHtml] = useState('<p></p>')
  const globalStore: any = useContext(GlobalContext)
  useEffect(() => {
    if (text != '') {
      setHtml(text)
    }
  }, [text])
  useEffect(() => {
    if (html != '<p></p>') {
      setEditor(EditorState.createWithContent(contentState))
    }
  }, [html])

  const contentBlock = htmlToDraft(html)
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  )
  const [editorState, setEditor] = useState(
    EditorState.createWithContent(contentState)
  )
  const [editText, setEditText] = useState<string>('')

  const onEditorStateChange: Function = (editorState: any) => {
    setEditor(editorState)
  }
  useEffect(() => {
    setEditText(
      draftToHtml(convertToRaw(editorState.getCurrentContent())).trim()
    )
  }, [editorState])

  return (
    <div className='advanced-overlay'>

      <div className='advanced-input'>
        <form
          className='form advanced-form '
          style={globalStore.formStyle || formStyle}
          onSubmit={async (e) =>
            editText != '<p></p>'
              ? (await handleSubmit(e, editText),
                setEditor(EditorState.createEmpty()))
              : null
          }
        >
          <div className='advanced-border'>
            <Editor
              localization={{
                locale: 'en',
                translations: {
                  'generic.add': 'Thêm',
                  'generic.cancel': 'Hủy bỏ',
                  // BlockType
                  'components.controls.blocktype.h1': 'Tiêu đề 1',
                  'components.controls.blocktype.h2': 'Tiêu đề 2',
                  'components.controls.blocktype.h3': 'Tiêu đề 3',
                  'components.controls.blocktype.h4': 'Tiêu đề 4',
                  'components.controls.blocktype.h5': 'Tiêu đề 5',
                  'components.controls.blocktype.h6': 'Tiêu đề 6',
                  'components.controls.blocktype.blockquote': 'Trích dẫn',
                  'components.controls.blocktype.code': 'Code',
                  'components.controls.blocktype.blocktype': 'Loại khối',
                  'components.controls.blocktype.normal': 'Bình thường',

                  // Color Picker
                  'components.controls.colorpicker.colorpicker': 'Color Picker',
                  'components.controls.colorpicker.text': 'Text',
                  'components.controls.colorpicker.background': 'Highlight',

                  // Embedded
                  'components.controls.embedded.embedded': 'Embedded',
                  'components.controls.embedded.embeddedlink': 'Embedded Link',
                  'components.controls.embedded.enterlink': 'Enter link',

                  // Emoji
                  'components.controls.emoji.emoji': 'Emoji',

                  // FontFamily
                  'components.controls.fontfamily.fontfamily': 'Font',

                  // FontSize
                  'components.controls.fontsize.fontsize': 'Font Size',

                  // History
                  'components.controls.history.history': 'History',
                  'components.controls.history.undo': 'Undo',
                  'components.controls.history.redo': 'Redo',

                  // Image
                  'components.controls.image.image': 'Image',
                  'components.controls.image.fileUpload': 'File Upload',
                  'components.controls.image.byURL': 'URL',
                  'components.controls.image.dropFileText': 'Drop the file or click to upload',

                  // Inline
                  'components.controls.inline.bold': 'Bold',
                  'components.controls.inline.italic': 'Italic',
                  'components.controls.inline.underline': 'Underline',
                  'components.controls.inline.strikethrough': 'Strikethrough',
                  'components.controls.inline.monospace': 'Monospace',
                  'components.controls.inline.superscript': 'Superscript',
                  'components.controls.inline.subscript': 'Subscript',

                  // Link
                  'components.controls.link.linkTitle': 'Link Title',
                  'components.controls.link.linkTarget': 'Link Target',
                  'components.controls.link.linkTargetOption': 'Open link in new window',
                  'components.controls.link.link': 'Link',
                  'components.controls.link.unlink': 'Unlink',

                  // List
                  'components.controls.list.list': 'List',
                  'components.controls.list.unordered': 'Unordered',
                  'components.controls.list.ordered': 'Ordered',
                  'components.controls.list.indent': 'Indent',
                  'components.controls.list.outdent': 'Outdent',

                  // Remove
                  'components.controls.remove.remove': 'Remove',

                  // TextAlign
                  'components.controls.textalign.textalign': 'Text Align',
                  'components.controls.textalign.left': 'Left',
                  'components.controls.textalign.center': 'Center',
                  'components.controls.textalign.right': 'Right',
                  'components.controls.textalign.justify': 'Justify',
                }
              }}
              editorState={editorState}
              placeholder={'Nhập câu trả lời của bạn tại đây'}
              onEditorStateChange={(editorState) =>
                onEditorStateChange(editorState)
              }
              toolbar={{
                options: [
                  'inline',
                  'list',
                  'link',
                  'image'
                ],
                link: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  popupClassName: undefined,
                  dropdownClassName: undefined,
                  showOpenOptionOnHover: true,
                  defaultTargetOption: '_self',
                  options: ['link'],
                  linkCallback: undefined
                },
                image: {
                  className: undefined,
                  component: undefined,
                  popupClassName: undefined,
                  urlEnabled: true,
                  uploadEnabled: true,
                  alignmentEnabled: true,
                  uploadCallback: undefined,
                  previewImage: false,
                  inputAccept:
                    'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                  alt: { present: false, mandatory: false },
                  defaultSize: {
                    height: 'auto',
                    width: 'auto'
                  }
                },
                inline: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                  options: [
                    'bold',
                    'italic',
                    'underline',
                  ]
                },
                blockType: {
                  inDropdown: true,
                  options: ['Normal', 'Blockquote', 'Code'],
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined
                },
                list: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                  options: ['unordered', 'ordered']
                }
              }}
            />
          </div>
          {/* <div
            dangerouslySetInnerHTML={{
              __html: text
            }}
          /> */}
          <div className='advanced-btns'>
            {mode && (
              <button
                className='advanced-cancel cancelBtn'
                style={globalStore.cancelBtnStyle || cancelBtnStyle}
                type='button'
                onClick={() =>
                  mode === 'editMode'
                    ? globalStore.handleAction(comId, true)
                    : globalStore.handleAction(comId, false)
                }
              >
                Hủy bỏ
              </button>
            )}
            <button
              className='advanced-post postBtn'
              type='submit'
              disabled={editText === '<p></p>' ? true : false}
              style={globalStore.submitBtnStyle || submitBtnStyle}
              onClick={async (e) =>
                editText != '<p></p>'
                  ? (await handleSubmit(e, editText),
                    setEditor(EditorState.createEmpty()))
                  : null
              }
            >
              Trả lời
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdvancedInput
