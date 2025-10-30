-- Create RPC function to check if invite code is valid
CREATE OR REPLACE FUNCTION public.check_invite_code(p_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.admin_invite_codes
    WHERE code = p_code
      AND is_used = false
      AND expires_at > now()
  );
END;
$$;

-- Create RPC function to mark invite code as used
CREATE OR REPLACE FUNCTION public.use_invite_code(p_code text, p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.admin_invite_codes
  SET is_used = true,
      used_by = p_user_id
  WHERE code = p_code
    AND is_used = false
    AND expires_at > now();
END;
$$;