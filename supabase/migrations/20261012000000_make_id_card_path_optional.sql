-- New orders no longer collect an ID or passport document.
-- Keep historical document paths, but allow new orders to omit them.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'information'
      AND column_name = 'id_card_path'
  ) THEN
    ALTER TABLE public.information
      ALTER COLUMN id_card_path DROP NOT NULL;
  END IF;
END;
$$;
