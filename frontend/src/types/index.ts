// ============ User Types ============

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'donor' | 'recipient' | 'both';
  district?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  avatar_url?: string;
  is_verified?: boolean;
  created_at?: string;
}

// ============ Food Box Types ============

export type FoodBoxStatus = 'available' | 'reserved' | 'completed' | 'cancelled';

export interface FoodBox {
  id: string;
  donor_id: string;
  title: string;
  description: string;
  quantity: number;
  status: FoodBoxStatus;
  latitude: number;
  longitude: number;
  district: string;
  pickup_address: string;
  pickup_time_start: string;
  pickup_time_end: string;
  contact_method: 'message' | 'phone' | 'both';
  images: string | null;
  created_at: string;
  updated_at?: string;
  // Joined fields
  donor_name?: string;
  donor_avatar?: string;
  donor_phone?: string;
  user_application?: Application | null;
}

// ============ Application Types ============

export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';

export interface Application {
  id: string;
  food_box_id: string;
  recipient_id: string;
  status: ApplicationStatus;
  message: string;
  quantity_requested: number;
  approved_at: string | null;
  created_at: string;
  // Joined fields
  title?: string;
  pickup_address?: string;
  pickup_time_start?: string;
  pickup_time_end?: string;
  donor_name?: string;
  recipient_name?: string;
  recipient_avatar?: string;
  recipient_phone?: string;
}

// ============ Notification Types ============

export type NotificationType =
  | 'application_received'
  | 'application_approved'
  | 'application_rejected'
  | 'food_box_reserved';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string;
  related_food_box_id: string | null;
  related_application_id: string | null;
  is_read: boolean;
  created_at: string;
}

// ============ API Response Types ============

export interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
    status?: number;
  };
}

export interface PaginatedParams {
  limit?: number;
  offset?: number;
}

// ============ Map Types ============

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  district?: string;
  quantity?: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}
