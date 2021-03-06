// Copyright 2014 Runtime.JS project authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

rt.log('Loading system...');

(function() {
    "use strict";

    /**
     * Create DI injector
     */
    var injector = new Injector();

    /**
     * Pretend this is an AMD loader
     */
    var define = injector.set;
    define.amd = {};

    /**
     * Component provides access to kernel resources
     */
    define('resources', [],
    function() {
        return rt.resources();
    });

    /**
     * Kernel bootstrap component. This loads kernel loader,
     * because it can't load itself
     */
    define('bootstrap', ['resources'],
    function(resources) {
        var loaderFactory = new Function('define',
            resources.loader('/system/kernel-loader.js'));
        loaderFactory(define);
    });

    /**
     * Main kernel component
     */
    define('kernel', ['resources', 'vga', 'keyboard'],
    function(resources, vga, keyboard) {
        resources.processManager.create(rt.initrdText("/app/terminal.js"), {
            textVideo: vga.client,
            keyboard: keyboard.client,
        });

        return {};
    });
})();
