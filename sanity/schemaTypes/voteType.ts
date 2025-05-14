import { defineType, defineField } from 'sanity';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const voteType = defineType({
  name: 'vote',
  title: 'Vote',
  type: 'document',
  icon: ArrowUp, // Default icon
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'voteType',
      title: 'Vote Type',
      type: 'string',
      options: {
        list: [
          { title: 'Upvote', value: 'upvote' },
          { title: 'Downvote', value: 'downvote' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'Vote on a post (optional if voting on a comment)',
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'reference',
      to: [{ type: 'comment' }],
      description: 'Vote on a comment (optional if voting on a post)',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required(),
    }),
  ],

  preview: {
    select: {
      voteType: 'voteType',
      postTitle: 'post.title',
      commentContent: 'comment.content', // Adjust if comment uses 'text' or other field
      username: 'user.username',
    },
    prepare({ voteType, postTitle, commentContent, username }) {
      return {
        title: postTitle || commentContent || 'Vote',
        subtitle: username ? `${username} (${voteType})` : voteType,
        media: voteType === 'upvote' ? ArrowUp : ArrowDown,
      };
    },
  },

  // Optional custom validation logic (handled differently in Sanity)
  // Note: For complex logic, it's better to enforce it in app logic
});
