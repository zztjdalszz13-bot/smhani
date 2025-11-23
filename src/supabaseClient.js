
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lyxqvxkvvfkeoicapezx.supabase.co'
const supabaseKey = 'sb_publishable_2vFsRJeg0MbMnCC_aewXZw_jQgkWI8U'

export const supabase = createClient(supabaseUrl, supabaseKey)
