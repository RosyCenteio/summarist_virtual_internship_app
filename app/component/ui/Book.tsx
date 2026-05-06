import React from 'react'

export interface Book {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  averageRating: number;
  totalRating: number;
  keyIdeas: number
  tags:string;
  summary: string;
  bookDescription: string;
  authorDescription: string;
  audioLink: string;
  subscriptionRequired: boolean;
}

