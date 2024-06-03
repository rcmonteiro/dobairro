import {
  Avatar,
  AvatarImage,
  AvatarName,
  AvatarRole,
  Button,
  Card,
  CardContent,
} from '@dobairro/design-system'
import { Pencil, Trash } from '@phosphor-icons/react/dist/ssr'

import Container from '@/components/panel/container'
import Header from '@/components/panel/header'

export default function Users() {
  return (
    <Container>
      <Header>Equipe</Header>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <Avatar size="big" className="mt-4">
              <AvatarImage className="size-44" src="/images/avatar.png" />
              <AvatarName>Ricardo Monteiro</AvatarName>
              <AvatarRole>Developer</AvatarRole>
            </Avatar>
            <CardContent>
              <div className="flex justify-around gap-2">
                <Button variant="outline" size="small" className="bg-white">
                  <Pencil className="mr-2 size-3" />
                  Editar acesso
                </Button>
                <Button variant="outline" size="small" className="bg-white">
                  <Trash className="mr-2 size-3" />
                  Remover acesso
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}
