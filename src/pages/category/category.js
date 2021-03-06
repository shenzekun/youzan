import 'css/common.css';
import './category.css';

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import mixin from 'js/mixin.js';

new Vue({
  el: '#app',
  data: {
    topLists: null,
    topIndex: 0,
    subData: null,
    rankData: null
  },
  created() {
    this.getTopLists();
    this.getSubList(0);
  },
  methods: {
    getTopLists() {
      axios
        .post(url.topLists)
        .then(res => {
          this.topLists = res.data.lists;
        })
        .catch(res => {});
    },
    getSubList(index, id) {
      this.topIndex = index;
      if (index === 0) {
        this.getRank();
      } else {
        axios.post(url.subList, { id }).then(res => {
          this.subData = res.data.data;
        });
      }
    },
    getRank() {
      axios.post(url.rank).then(res => {
        this.rankData = res.data.data;
      });
    },
    toSearch(list) {
      location.href = `search.html?keyword=${list.name}&id=${list.id}`;
    }
  },
  mixins: [mixin]
});
