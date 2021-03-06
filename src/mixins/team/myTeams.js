import { teams } from "@/api/teams";
import loading from "@/mixins/common/loading";

export default {
  mixins: [loading],
  data() {
    return {
      teams: [],
      fields: [
        {
          key: "name",
          label: "Name",
        },
        {
          key: "currency",
          label: "Currency",
        },
        {
          key: "team_fees_total",
          label: "Fees total",
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
    };
  },
  async mounted() {
    this.loading = true;
    this.teams = await this.getMyTeams();
    this.processToast();
    this.loading = false;
  },
  methods: {
    async getMyTeams() {
      let response = await teams.getTeams();
      return response.data;
    },
    openTeam(team) {
      this.$router.push(`/teams/${team.id}`);
    },
    createTeam() {
      this.$router.push("/teams/create");
    },
    processToast() {
      if (this.$route.query.toast === "team-created") {
        this.$bvToast.show("team-created");
      }
    },
  },
};
