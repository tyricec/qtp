export default function googleDirectionsReducer(result) {
  return result.routes[0].legs[0].steps.map((step) => { return { instructions: step.instructions, } })
}