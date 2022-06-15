import create from 'zustand';
import {devtools} from 'zustand/middleware';
import axios from 'axios';

const useAjaxStore = create(
  devtools((set, get) => ({
    albums: [],

    async getAlbums() {
      try {
        const resData = await axios.get(process.env.REACT_APP_API_URL + `/albums`);
        const arr = [];

        for (let i = 0; i < resData.data.length; ++i) {
          const {id, userId, title} = resData.data[i];
          const albums = {
            id,
            userId,
            title,
          };
          arr.push(albums);
        }
        set(state => ({albums: arr}));
      } catch (err) {
        console.log('getAlbums:::', err);
        set(state => ({albums: []}));
      }
    },

    updateAlbum(id, content) {
      const temp = Array.from(get().albums);
      temp[id - 1].title = content;
      set(state => ({albums: [...temp]}));
    },
  })),
);

export default useAjaxStore;
