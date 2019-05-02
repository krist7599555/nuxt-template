<template>
  <div class="hero is-fullheight is-info">
    <div class="hero-body">
      <div class="container">
        <no-ssr>
          <b-field group>
            <b-field>
              <b-input v-model="name" placeholder="name"></b-input>
            </b-field>
            <b-button @click="add" type="is-success">Add</b-button>
          </b-field>
          <b-table :data="users">
            <template slot-scope="props">
              <b-table-column
                v-for="{field, label} in columns"
                :field="field"
                :label="label"
                :key="field.id"
              >{{props.row[field]}}</b-table-column>
              <b-table-column>
                <b-button type="is-danger" @click="remove(props.row._id)">remove</b-button>
              </b-table-column>
            </template>
            <template slot="empty">
              <section class="section">
                <div class="content has-text-grey has-text-centered">
                  <p>
                    <b-icon icon="frown" pack="fas" size="is-large"></b-icon>
                    <!-- <b-icon icon="emoticon-sad" size="is-large"></b-icon> -->
                  </p>
                  <p>Nothing here.</p>
                </div>
              </section>
            </template>
          </b-table>
        </no-ssr>
      </div>
    </div>
  </div>
</template>
<script>
import * as _ from "lodash";

export default {
  name: "home",
  async asyncData({ $axios }) {
    const users = await $axios.get("/api/user").then(res => res.data);
    return {
      users
    };
  },
  data() {
    return {
      name: ""
    };
  },
  computed: {
    columns() {
      return _.uniq(_.flatten(this.users.map(_.keys))).map(v => ({
        field: v,
        label: v
      }));
    }
  },
  methods: {
    async fetchTable() {
      this.users = await this.$nuxt.$axios
        .get("/api/user")
        .then(res => res.data);
    },
    async add() {
      if (!this.name) {
        this.$toast.open("name is empty");
      } else {
        await this.$nuxt.$axios.post("/api/user", { name: this.name });
        this.$toast.open("add success");
        this.name = "";
        await this.fetchTable();
      }
    },
    async remove(_id) {
      await this.$nuxt.$axios.delete("/api/user/" + _id);
      this.$toast.open("delete success");
      await this.fetchTable();
    }
  }
};
</script>

<style lang='scss' scoped>
.container {
  max-width: $tablet;
}
</style>
