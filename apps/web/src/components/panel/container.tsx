interface ContainerProps {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <div className="m-auto max-w-7xl p-8">{children}</div>
}
