import * as React from "react"
import { useState, useEffect } from "react"
import { useQueryParam, StringParam } from "use-query-params"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

/** load used components */
import { TeamDetailsCard } from "../../components/team.details"

/**
 * TeamPage
 *
 * Loads team details from various apis and shows a graphical representation of data
 */
const TeamPage = () => {
  /** load team id from page id */
  const [teamID] = useQueryParam("id", StringParam)

  return (
    <Layout>
      <Seo title="Team Details" />

      <TeamDetailsCard id={teamID} />
    </Layout>
  )
}

export default TeamPage
