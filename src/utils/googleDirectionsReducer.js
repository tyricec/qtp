export default function googleDirectionsReducer(status, result) {
  if (status === 'OK') {
    return result.routes[0].legs[0].steps.map((step) => { 
      return { instruction: step.instructions, maneuver: step.maneuver, } 
    })
  } else {
    return []
  }
}