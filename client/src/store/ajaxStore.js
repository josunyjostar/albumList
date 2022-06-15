import create from 'zustand';
import {devtools} from 'zustand/middleware';
import axios from 'axios';

const useAjaxStore = create(
  devtools(set => ({
    albums: [],

    async getAlbums() {
      try {
        const resData = await axios.get(process.env.REACT_APP_API_URL + `/albums`);
        const arr = [];

        console.log('ajax 요청횟수');

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
  })),
);

export default useAjaxStore;
