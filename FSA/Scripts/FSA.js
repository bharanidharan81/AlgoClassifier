if (!window.FSA)
{
    (function ()
    {
        function FsaNamespace(parentNamespace, namespaceString)
        {
            var _namespace = this;
        }
        //
        // This method takes care of creating namespaces (single or multiple), 
        // if it does not exists.
        //
        FsaNamespace.prototype.createNamespace = function ()
        {
            var a = arguments, o = null, i, j, d;
            for (i = 0; i < a.length; i++)
            {
                var val = "";
                try
                {
                    if ((typeof a[i] === "string") || (a[i] instanceof String))
                    {
                        val = a[i].toString();
                    }
                }
                catch (e)
                {
                    val = "";
                }

                if (val == "")
                {
                    continue;
                }

                d = ("" + val).split(".");
                o = window;
                for (j = 0; j < d.length; j++)
                {
                    var namespaceToBeAdded = d[j];

                    if (!namespaceToBeAdded || (namespaceToBeAdded.length < 0))
                    {
                        namespaceToBeAdded = "_";
                    }
                    else if (namespaceToBeAdded.indexOf(" ") > -1) // This can be extended to check on other special character
                    {
                        namespaceToBeAdded = namespaceToBeAdded.replace(/\s+/g, "_");
                    }

                    o[namespaceToBeAdded] = o[namespaceToBeAdded] || new SkeltaNamespace(o, namespaceToBeAdded);
                    o = o[namespaceToBeAdded];
                }
            }
            return o;
        };

        // Creation of the Main namespace
        window.FSA = window.FSA || new FsaNamespace(null, "FSA");

        /* 

        Example on how to create a namespace. 
        Below example, you can pass multiple namespace arguments, which 
        will take care creating the namespaces.

        FSA.CreateNamespace("FSA.Utils", "Skelta.Forms.Core.Controls");

        After the creation of the namespaces, you can use it as "Skelta.Forms.GetNamespaceString() or 
        Skelta.Forms.GetLongNamespaceString()" which will return the value as "Skelta.Forms". If you 
        use "Skelta.Forms.GetShortNamespaceString()", it will return the value as "Forms", i.e., the 
        current namespace string.

        Later you can also create namespaces with the already created namespaces like

        Skelta.Forms.CreateNamespace("Skelta.Forms.Core.Controls.HtmlControls");

        You can also create multiple namespaces with the already created namespaces like

        Skelta.Forms.CreateNamespace("Skelta.Forms.Core.Controls.HtmlControls", "Skelta.Forms.Core.Controls.CustomControls");

        But the namespaces should be given the complete strings while creating the namespaces.

        */

        FSA.BaseClass = function (namespace, className)
        {
            var _baseClass = this;


            _baseClass.getClassName = function ()
            {
                return className;
            };

            ////_baseClass.GetType = function ()
            ////{
            ////    return namespace.GetNamespaceString() + "." + className;
            ////};
        }

        FSA.BaseClass.prototype = FSA.BaseClass;

    })();
}


$(function ()
{
    window.FSA = window.FSA || new FsaNamespace(null, "FSA");

    function Utilities()
    {
        FSA.BaseClass.call(this, FSA, "Utilities");       
    }

    Utilities.Data = (function ()
    {
        var sampleData = {
            Datasets: [
                { "slno": 1, "Dataset": "ALLAML", "Feature": "7129", "Observations": "72", "Download": "Download.zip", "StatisticalAnalysis": "ALLAML.jpg" },
                { "slno": 2, "Dataset": "ARCNENE", "Feature": "10000", "Observations": "200", "Download": "ARCNENE.zip", "StatisticalAnalysis": "ARCNENE.jpg" },
                { "slno": 3, "Dataset": "GLI-85", "Feature": "22283", "Observations": "85", "Download": "GLI85.zip", "StatisticalAnalysis": "GLI.jpg" },
                { "slno": 4, "Dataset": "PROSTAT", "Feature": "5966", "Observations": "102", "Download": "PROSTAT.zip", "StatisticalAnalysis": "PROSTAT.jpg" },
                { "slno": 5, "Dataset": "SMK-CAN-1987", "Feature": "19993", "Observations": "87", "Download": "SMKCAN1987.zip", "StatisticalAnalysis": "SMKCAN1987.jpg" }
            ],

            FeatureAlgorithm: [
                { "Name": "ARRE Algorithm", "DownloadLink": "ARREAlgorithm.zip", "AnalysisLink": "ARREAlgorithm.jpg" }
            ],

            ClassificationAlgorithm: [
                { "Name": "HSVM Classifier", "DownloadLink": "HSVMClassifier.zip", "AnalysisLink": "HSVMClassifier.jpg" }
            ]
        }; 

        return sampleData;
       
    })();

    Utilities.prototype.downloadFile = function (sUrl)
    {
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ||
            navigator.userAgent.toLowerCase().indexOf('safari') > -1)
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

    Utilities.prototype.ShowPicture = function (url)
    {
        debugger;
        var link = document.createElement("a");
        $(link).click(function (e)
        {
            e.preventDefault();
            window.open(url, 'popupwindow', 'scrollbars,resizable');
        });
        $(link).click();

    };

    window.FSA.Utilities = new Utilities();


    FSA.ViewModel = {       

        Datasets: ko.observableArray(Utilities.Data.Datasets),

        FeatureAlgorithm: ko.observableArray(Utilities.Data.FeatureAlgorithm),

        ClassificationAlgorithm: ko.observableArray(Utilities.Data.ClassificationAlgorithm),

        onClickDownloadDataset: function (dataset)
        {
            debugger;
            var urllink = "http://localhost:8020/AppData/" + dataset.Download;
            FSA.Utilities.downloadFile(urllink);
            return true;
        },

        onClickStatisticalAnalysis: function (dataset)
        {
            var urllink = "http://localhost:8020/AppData/" + dataset.StatisticalAnalysis;
            FSA.Utilities.ShowPicture(urllink);
            return true;
        },

        onClickDownloadLink: function (algo)
        {
            var urllink = "http://localhost:8020/AppData/" + algo.DownloadLink;
            FSA.Utilities.downloadFile(urllink);
            return true;
        },

        onClickAnalysisLink: function (algo)
        {
            var urllink = "http://localhost:8020/AppData/" + algo.AnalysisLink;
            FSA.Utilities.ShowPicture(urllink);
            return true;
        }
    };

    ko.applyBindings(FSA.ViewModel);
});


//$(document).ready(function ()
//{
//    $('.download').click(function ()
//    {
//        window.downloadFile($(this).attr('data-download'));
//    });
//})