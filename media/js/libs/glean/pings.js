/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// AUTOGENERATED BY glean_parser. DO NOT EDIT. DO NOT COMMIT.

import PingType from "@mozilla/glean/private/ping";

/**
 * A ping which is sent everytime a page is viewed.
 *
 * Generated from `page-view`.
 */
export const pageView = new PingType({
    includeClientId: true,
    sendIfEmpty: false,
    name: "page-view",
    reasonCodes: [],
});

/**
 * A ping which is sent when a page element is
 * interacted with.
 *
 * Generated from `interaction`.
 */
export const interaction = new PingType({
    includeClientId: true,
    sendIfEmpty: false,
    name: "interaction",
    reasonCodes: [],
});

/**
 * A ping which is sent when a non-user initiated event
 * occurs. Examples: a specific banner impression is
 * displayed, a video auto-plays on scroll.
 *
 * Generated from `non-interaction`.
 */
export const nonInteraction = new PingType({
    includeClientId: true,
    sendIfEmpty: false,
    name: "non-interaction",
    reasonCodes: [],
});


