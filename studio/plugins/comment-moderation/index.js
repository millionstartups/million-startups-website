import React from 'react'
import {route} from 'part:@sanity/base/router'
import CommentTool from './CommentTool'
import { MdChatBubbleOutline } from 'react-icons/md';

export default {
  title: 'Comments',
  name: 'comments-mod',
  icon: MdChatBubbleOutline,
  router: route('/:selectedDocumentId'),
  component: CommentTool
}