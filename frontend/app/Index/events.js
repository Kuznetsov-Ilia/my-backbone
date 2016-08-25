import VIEWER from 'app/Viewer';
export default {
  'click [gallery]': gallery
};


function gallery(e) {
  e.preventDefault();
  //var src = JSON.parse(e.target.attr('gallery'));
  VIEWER.show({
    src: ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpg', '/images/7.jpg']
  });
}
