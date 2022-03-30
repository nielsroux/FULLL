import { applicationContainerModule } from '@app/container'
import { infrastructureContainerModule } from '@infra/container'
import { Container } from 'inversify'

const loadContainer = async () => {
  const container = new Container()
  container.load(applicationContainerModule)
  await container.loadAsync(infrastructureContainerModule)

  return container
}

export { loadContainer }
