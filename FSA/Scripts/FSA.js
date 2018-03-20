$(function ()
{
    var FSA = {};      

    FSA.ViewModel = {
        onDownloadClick: function ()
        {     
            //var $preparingFileModal = $("#preparing-file-modal");
            //$preparingFileModal.dialog({ modal: true });
            //$.fileDownload('http://localhost:8020/AppData/Download.zip', {
            //    successCallback: function (url)
            //    {
            //        $preparingFileModal.dialog('close');
            //    },
            //    failCallback: function (responseHtml, url)
            //    {

            //        $preparingFileModal.dialog('close');
            //        $("#error-modal").dialog({ modal: true });
            //    }
            //});            
            window.downloadFile('http://localhost:8020/AppData/Download.zip');
            return true;       
        }
    };       
    ko.applyBindings(FSA.ViewModel);     
});

function downloadFile(url)
{
    var link = document.createElement("a");  
    $(link).click(function (e)
    {
        e.preventDefault();
        window.open(url, 'popupwindow', 'scrollbars,resizable');       
    });
    $(link).click();    
}

window.downloadFile = function (sUrl)
{
    if (window.downloadFile.isChrome || window.downloadFile.isSafari)
    {
        var link = document.createElement('a');
        link.href = sUrl;
        if (link.download !== undefined)
        {
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }
        if (document.createEvent)
        {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }
    var query = '?download';
    window.open(sUrl + query, '_self');
};

window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

//$(document).ready(function ()
//{
//    $('.download').click(function ()
//    {
//        window.downloadFile($(this).attr('data-download'));
//    });
//})