import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const initialise = async () => {
  // CLI initialisation
  yargs(hideBin(process.argv))
    .commandDir('app/commands')
    .strict()
    .alias({ h: 'help' }).argv
}

export { initialise }
