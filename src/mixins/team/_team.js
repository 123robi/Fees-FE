import { teams } from "@/api/teams";
import loading from "@/mixins/common/loading";

export default {
  mixins: [loading],
  data() {
    return {
      team: {},
      teamId: "",
      playerFields: [
        { key: "email", label: "Email" },
        { key: "first_name", label: "Name" },
        { key: "last_name", label: "Surname" },
        { key: "actions" },
      ],
      feeFields: [
        { key: "email", label: "Email" },
        { key: "first_name", label: "Name" },
        { key: "last_name", label: "Surname" },
        { key: "actions" },
      ],
    };
  },
  watch: {
    $route(to) {
      this.teamId = to.params.team_id || "";
    },
  },
  async mounted() {
    this.loading = true;
    this.teamId = this.$route.params.team_id;
    this.team = await this.getTeam(this.teamId);
    this.loading = false;
  },
  methods: {
    async getTeam(teamId) {
      let response = await teams.getTeam(teamId);
      return response.data;
    },
    addPlayer() {
      this.$router.push(`/teams/${this.team.id}/invite`);
    },
  },
};