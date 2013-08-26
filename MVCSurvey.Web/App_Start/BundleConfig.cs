﻿using System.Web.Optimization;

namespace MVCSurvey.Web.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery/jquery.unobtrusive*",
                        "~/Scripts/jquery/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/javascript").Include(
                ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/xinha").Include(
                "~/Scripts/xinha/init.js",
                "~/Scripts/xinha/XinhaCore.js",
                "~/Scripts/xinha/my_config.js"));

            bundles.Add(new ScriptBundle("~/bundles/survey").Include(
                "~/Scripts/survey/take.js",
                "~/Scripts/survey/edit.js",
                "~/Scripts/survey/create.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/reset.css",
                "~/Content/Site.css"));      

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            bundles.Add(new StyleBundle("~/Content/Survey/bundle").Include("~/Content/survey/survey.css"));

            RegisterScripts(bundles);
            RegisterStyles(bundles);
        }

        public static void RegisterScripts(BundleCollection bundles)
        {

        }

        public static void RegisterStyles(BundleCollection bundles)
        {

        }

    }
}