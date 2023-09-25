import { savePreferences } from '$lib/profile/api/save-preferences.js';

export const actions = {
  save: async ({ request, fetch }) => {
    const data = await request.formData();

    const soundVolume = data.get('soundVolume')?.toString() ?? '1.0';
    const res = await savePreferences(
      {
        soundVolume,
      },
      fetch,
    );
    console.log(res);
  },
};
