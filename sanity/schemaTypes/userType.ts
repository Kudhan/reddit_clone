import { defineType, defineField } from 'sanity';
import { UserIcon } from 'lucide-react';

export const userType = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: Rule =>
        Rule.required().error('Username is required'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule =>
        Rule.required().error('Email is required'),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
    }),
    defineField({
      name: 'joinedAt',
      title: 'Joined At',
      type: 'datetime',
      validation: Rule => Rule.required().error('Join date is required'),
    }),
    defineField({
      name: 'isReported',
      title: 'Is Reported',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'username',
      subtitle: 'email',
      media: 'imageUrl',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media: media || UserIcon, // fallback to icon if no image URL
      };
    },
  },
});
