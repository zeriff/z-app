import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'toast-title': {
    'fontWeight': '700'
  },
  'toast-message': {
    'MsWordWrap': 'break-word',
    'wordWrap': 'break-word'
  },
  'toast-message a': {
    'color': '#FFF'
  },
  'toast-message label': {
    'color': '#FFF'
  },
  'toast-message a:hover': {
    'color': '#CCC',
    'textDecoration': 'none'
  },
  'toast-close-button': {
    'position': 'relative',
    'right': [{ 'unit': 'em', 'value': -0.3 }],
    'top': [{ 'unit': 'em', 'value': -0.3 }],
    'float': 'right',
    'fontSize': [{ 'unit': 'px', 'value': 20 }],
    'fontWeight': '700',
    'color': '#FFF',
    'WebkitTextShadow': '0 1px 0 #fff',
    'textShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#fff' }],
    'opacity': '.8',
    'MsFilter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=80)',
    'filter': 'alpha(opacity=80)',
    'lineHeight': [{ 'unit': 'px', 'value': 1 }]
  },
  'toast-close-button:focus': {
    'color': '#000',
    'textDecoration': 'none',
    'cursor': 'pointer',
    'opacity': '.4',
    'MsFilter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=40)',
    'filter': 'alpha(opacity=40)'
  },
  'toast-close-button:hover': {
    'color': '#000',
    'textDecoration': 'none',
    'cursor': 'pointer',
    'opacity': '.4',
    'MsFilter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=40)',
    'filter': 'alpha(opacity=40)'
  },
  'rtl toast-close-button': {
    'left': [{ 'unit': 'em', 'value': -0.3 }],
    'float': 'left',
    'right': [{ 'unit': 'em', 'value': 0.3 }]
  },
  'buttontoast-close-button': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'cursor': 'pointer',
    'background': '0 0',
    'border': [{ 'unit': 'px', 'value': 0 }],
    'WebkitAppearance': 'none'
  },
  'toast-top-center': {
    'top': [{ 'unit': 'px', 'value': 0 }],
    'right': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'toast-bottom-center': {
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'right': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'toast-top-full-width': {
    'top': [{ 'unit': 'px', 'value': 0 }],
    'right': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'toast-bottom-full-width': {
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'right': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'toast-top-left': {
    'top': [{ 'unit': 'px', 'value': 12 }],
    'left': [{ 'unit': 'px', 'value': 12 }]
  },
  'toast-top-right': {
    'top': [{ 'unit': 'px', 'value': 12 }],
    'right': [{ 'unit': 'px', 'value': 12 }]
  },
  'toast-bottom-right': {
    'right': [{ 'unit': 'px', 'value': 12 }],
    'bottom': [{ 'unit': 'px', 'value': 12 }]
  },
  'toast-bottom-left': {
    'bottom': [{ 'unit': 'px', 'value': 12 }],
    'left': [{ 'unit': 'px', 'value': 12 }]
  },
  '#toast-container': {
    'position': 'fixed',
    'zIndex': '999999',
    'pointerEvents': 'none'
  },
  '#toast-container *': {
    'MozBoxSizing': 'border-box',
    'WebkitBoxSizing': 'border-box',
    'boxSizing': 'border-box'
  },
  '#toast-container>div': {
    'position': 'relative',
    'pointerEvents': 'auto',
    'overflow': 'hidden',
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 6 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 50 }],
    'width': [{ 'unit': 'px', 'value': 300 }],
    'MozBorderRadius': '3px',
    'WebkitBorderRadius': '3px',
    'borderRadius': '3px',
    'backgroundPosition': '15px center',
    'backgroundRepeat': 'no-repeat',
    'MozBoxShadow': '0 0 12px #999',
    'WebkitBoxShadow': '0 0 12px #999',
    'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 12 }, { 'unit': 'string', 'value': '#999' }],
    'color': '#FFF',
    'opacity': '.8',
    'MsFilter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=80)',
    'filter': 'alpha(opacity=80)',
    'all&&<w240': {
      'padding': [{ 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 50 }],
      'width': [{ 'unit': 'em', 'value': 11 }]
    },
    'all&&>w241&&<w480': {
      'padding': [{ 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 50 }],
      'width': [{ 'unit': 'em', 'value': 18 }]
    },
    'all&&>w481&&<w768': {
      'padding': [{ 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 50 }],
      'width': [{ 'unit': 'em', 'value': 25 }]
    }
  },
  '#toast-container>divrtl': {
    'direction': 'rtl',
    'padding': [{ 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 50 }, { 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 15 }],
    'backgroundPosition': 'right 15px center'
  },
  '#toast-container>div:hover': {
    'MozBoxShadow': '0 0 12px #000',
    'WebkitBoxShadow': '0 0 12px #000',
    'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 12 }, { 'unit': 'string', 'value': '#000' }],
    'opacity': '1',
    'MsFilter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)',
    'filter': 'alpha(opacity=100)',
    'cursor': 'pointer'
  },
  '#toast-container>toast-info': {
    'backgroundImage': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=)!important'
  },
  '#toast-container>toast-error': {
    'backgroundImage': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=)!important'
  },
  '#toast-container>toast-success': {
    'backgroundImage': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==)!important'
  },
  '#toast-container>toast-warning': {
    'backgroundImage': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=)!important'
  },
  '#toast-containertoast-bottom-center>div': {
    'width': [{ 'unit': 'px', 'value': 300 }],
    'marginLeft': [{ 'unit': 'string', 'value': 'auto' }],
    'marginRight': [{ 'unit': 'string', 'value': 'auto' }]
  },
  '#toast-containertoast-top-center>div': {
    'width': [{ 'unit': 'px', 'value': 300 }],
    'marginLeft': [{ 'unit': 'string', 'value': 'auto' }],
    'marginRight': [{ 'unit': 'string', 'value': 'auto' }]
  },
  '#toast-containertoast-bottom-full-width>div': {
    'width': [{ 'unit': '%H', 'value': 0.96 }],
    'marginLeft': [{ 'unit': 'string', 'value': 'auto' }],
    'marginRight': [{ 'unit': 'string', 'value': 'auto' }]
  },
  '#toast-containertoast-top-full-width>div': {
    'width': [{ 'unit': '%H', 'value': 0.96 }],
    'marginLeft': [{ 'unit': 'string', 'value': 'auto' }],
    'marginRight': [{ 'unit': 'string', 'value': 'auto' }]
  },
  'toast': {
    'backgroundColor': '#030303'
  },
  'toast-success': {
    'backgroundColor': '#51A351'
  },
  'toast-error': {
    'backgroundColor': '#BD362F'
  },
  'toast-info': {
    'backgroundColor': '#2F96B4'
  },
  'toast-warning': {
    'backgroundColor': '#F89406'
  },
  'toast-progress': {
    'position': 'absolute',
    'left': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'height': [{ 'unit': 'px', 'value': 4 }],
    'backgroundColor': '#000',
    'opacity': '.4',
    'MsFilter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=40)',
    'filter': 'alpha(opacity=40)'
  }
});
