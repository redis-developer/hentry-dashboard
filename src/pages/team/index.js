import * as React from "react"
import { useState } from "react"
import { useQueryParam, StringParam } from "use-query-params"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const TeamPage = () => {
  const [teamID, setTeamID] = useQueryParam("id", StringParam)

  return (
    <Layout>
      <Seo title="Team Details" />
      <div>{teamID}</div>
    </Layout>
  )
}

export default TeamPage
