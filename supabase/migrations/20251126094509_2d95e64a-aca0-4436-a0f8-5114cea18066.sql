-- Drop old foreign key constraints that point to auth.users instead of profiles
ALTER TABLE public.posts DROP CONSTRAINT IF EXISTS posts_user_id_fkey;
ALTER TABLE public.follows DROP CONSTRAINT IF EXISTS follows_follower_id_fkey;
ALTER TABLE public.follows DROP CONSTRAINT IF EXISTS follows_following_id_fkey;

-- Add new foreign key constraints pointing to profiles
ALTER TABLE public.posts
ADD CONSTRAINT posts_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;

ALTER TABLE public.follows
ADD CONSTRAINT follows_follower_id_fkey 
FOREIGN KEY (follower_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;

ALTER TABLE public.follows
ADD CONSTRAINT follows_following_id_fkey 
FOREIGN KEY (following_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;

-- Add missing foreign key for notifications related_user_id
ALTER TABLE public.notifications
ADD CONSTRAINT notifications_related_user_id_fkey 
FOREIGN KEY (related_user_id) 
REFERENCES public.profiles(id) 
ON DELETE SET NULL;