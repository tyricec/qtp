const icons = {
  'merge': '<span class="icon-merge"></span>',
  'keep-right': '<span class="icon-keep-right"></span>',
  'keep-left': '<span class="icon-keep-left"></span>',
  'straight': '<span class="icon-straight"></span>',
  'turn-left': '<span class="icon-turn-left"></span>',
  'turn-right': '<span class="icon-turn-right"></span>',
  'sharp-turn-left': '<span class="icon-sharp-turn-left"></span>',
  'sharp-turn-right': '<span class="icon-sharp-turn-right"></span>',
  'slight-turn-left': '<span class="icon-slight-turn-left"></span>',
  'slight-turn-right': '<span class="icon-slight-turn-right"></span>',
  'u-turn-left': '<span class="icon-u-turn-left"></span>',
  'u-turn-right': '<span class="icon-u-turn-right"></span>',
  'roundabout-left': '<span class="icon-roundabout-left"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>',
  'roundabout-right': '<span class="icon-roundabout-right"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>',
  'merge-left': '<span class="icon-merge-left"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>',
  'merge-right': '<span class="icon-merge-right"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>',
  'ferry-train': '<span class="icon-ferry-train"></span>',
  'destination': '<span class="icon-destination"><span class="path1"></span><span class="path2"></span></span>',
  'ferry': '<span class="icon-ferry"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>',
  'directions': '<span class="icon-directions"></span>',
  'map': '<span class="icon-map"></span>',
}

export default {
  getIconElement: getIconElement,
}

function getIconElement(name) {
  const template = document.createElement('template')
  template.innerHTML = icons[name]
  return template.content.firstElementChild
}