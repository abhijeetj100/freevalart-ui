export type ContentStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export interface BaseContentMeta {
  slug: string;
  title: string;
  excerpt: string;
  status: ContentStatus;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
}

export interface ArtworkMeta extends BaseContentMeta {
  medium: string;
  dimensions: string;
  year: number;
  style: string;
  theme: string;
  imageUrl: string;
}

export interface BlogPostMeta extends BaseContentMeta {
  category: string;
  coverImageUrl: string;
  readingMinutes: number;
}

export interface ProductModel {
  id: string;
  title: string;
  description: string;
  status: ContentStatus;
  price: number;
  currency: string;
  inventoryMode: 'in-stock' | 'made-to-order';
  mediaAssetIds: string[];
}

export interface CustomOrderModel {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  category: string;
  description: string;
  budgetRange?: string;
  timeline?: string;
  status: 'submitted' | 'in-review' | 'quoted' | 'confirmed' | 'closed';
  referenceAssetIds: string[];
}

export interface ClassModel {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  venueType: 'online' | 'offline' | 'hybrid';
  scheduleIso: string;
  durationMinutes: number;
  capacity: number;
  waitlistEnabled: boolean;
  status: ContentStatus;
}

export interface UserCustomerModel {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  roles: Array<'admin' | 'customer'>;
  createdAt: string;
}

export interface TestimonialModel {
  id: string;
  customerName: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: 'shop' | 'class' | 'commission';
  status: ContentStatus;
}

export interface MediaAssetModel {
  id: string;
  provider: 'cloudinary' | 's3' | 'local';
  url: string;
  altText: string;
  width?: number;
  height?: number;
  mimeType?: string;
  status: ContentStatus;
  tags: string[];
}

export const CONTENT_WORKFLOW_STAGES: ContentStatus[] = [
  'draft',
  'scheduled',
  'published',
  'archived'
];
