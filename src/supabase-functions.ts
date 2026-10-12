import { supabase } from './supaBase-client';

export const uploadFile = async (file: File, fileName: string): Promise<string> => {
  try {
    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('esncardspics')
      .upload(fileName, file);

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get the public URL of the uploaded file
    const { data: urlData } = supabase.storage
      .from('esncardspics')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};



export const saveFormData = async (formData: any, acceptanceLetterUrl: string) => {
  try {
    const { error } = await supabase  // Remove .select() and don't expect data back
      .from('information')
      .insert([
        {
          fullname: formData.fullName,
          nationality: formData.nationality,
          dateOfBirth: formData.dob,
          email: formData.email,
          phoneNumber: formData.phone,
          streetName: formData.street,
          houseNumber: formData.houseNumber,
          apartmentNumber: formData.apartment || null,
          postalCode: parseInt(formData.postalCode) || 0,
          acceptance_letter_path: acceptanceLetterUrl,
        }
      ]);
      // REMOVE THIS: .select(); ← This is causing the 401 error

    if (error) {
      throw new Error(`Database insert failed: ${error.message}`);
    }

    console.log('✅ Save successful (no data returned)');
    return { success: true };  // Return simple success object
  } catch (error) {
    console.error('❌ Error saving form data:', error);
    throw error;
  }
};