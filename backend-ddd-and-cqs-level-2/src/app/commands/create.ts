import type { Arguments, CommandBuilder } from 'yargs'
import { TYPES } from '@constants/types'
import { FleetApplication } from '@app/controllers/fleet/FleetApplication'
import { Fleet } from '@domain/fleet/Fleet'
import { loadContainer } from '../../loadContainer'

type Options = {
  userid: string
}

export const command: string = 'create <userid>'
export const desc: string =
  'Create a user fleet with <userid> and return <fleetid>'

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs.positional('userid', { type: 'string', demandOption: true })

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { userid } = argv

  const container = await loadContainer()

  const fleetApplication = container.get<FleetApplication>(
    TYPES.FleetApplication
  )
  const fleet: Fleet = await fleetApplication.createFleet({
    userId: userid,
  })

  const response = `Success: fleet ID: ${fleet.guid}`

  process.stdout.write(response)
  process.exit(0)
}
