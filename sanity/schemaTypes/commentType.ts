import { defineType, defineField } from 'sanity';
import { MessageCircleIcon } from 'lucide-react';

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  icon: MessageCircleIcon,  // Icon for the comment
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: Rule => Rule.required().max(1000).warning('Comment body is too long'),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'parentComment',
      title: 'Parent Comment',
      type: 'reference',
      to: [{ type: 'comment' }],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isReported',
      title: 'Is Reported',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isDeleted',
      title: 'Is Deleted',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'content',
      subtitle: 'author.username',  // Assuming the user has a username field
      media: 'author.imageUrl', // Assuming the user has an imageUrl field
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title.length > 50 ? title.substring(0, 50) + '...' : title, // Truncate the comment content
        subtitle,
        media: media || MessageCircleIcon, // Fallback to MessageCircleIcon if no imageUrl
      };
    },
  },
});
