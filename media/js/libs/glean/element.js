/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// AUTOGENERATED BY glean_parser. DO NOT EDIT. DO NOT COMMIT.

import EventMetricType from "@mozilla/glean/private/metrics/event";

/**
 * An event containing metrics related to which element
 * in the page was clicked.
 *
 * Generated from `element.clicked`.
 */
export const clicked = new EventMetricType({
    category: "element",
    name: "clicked",
    sendInPings: ["interaction"],
    lifetime: "ping",
    disabled: false,
}, ["label", "position", "type"]);

