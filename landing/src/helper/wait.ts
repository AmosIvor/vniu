export default async function wait(ms: number = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
