const fs = require ('fs');

const saveLinkToFile = async driver => {
  const anchorTagToDownload = tdWithDownloadLinkAnchorTag[0];
  const anchorTagToDownloadHREF = await anchorTagToDownload.getAttribute (
    'href'
  );

  await request
    .get (anchorTagToDownloadHREF)
    .pipe (
      fs.createWriteStream (
        `C:/Users/frank.edwards/Downloads/NY_Assessment_Notices/${item}.pdf`
      )
    );
};

module.exports = saveLinkToFile;
