import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import DocRoot from '../DocRoot';
import DocSection from '../DocSection';

/* eslint import/no-webpack-loader-syntax: off */
let docsInstalling = require('!asciidoc-loader!../../docs/installing/index.adoc');
let docsSpring = require('!asciidoc-loader!../../docs/spring/index.adoc');
let docsConcepts = require('!asciidoc-loader!../../docs/concepts/index.adoc');
let docsJvm = require('!asciidoc-loader!../../docs/jvm/index.adoc');
let docsCache = require('!asciidoc-loader!../../docs/cache/index.adoc');

const systems = ['atlas', 'prometheus', 'datadog', 'graphite', 'ganglia', 'jmx', 'influx', 'statsd'];

let docsBySystem = {};
systems.forEach(sys => docsBySystem[sys] = require(`!asciidoc-loader!../../docs/implementations/${sys}.adoc`));

export default function DocRoutes() {
  return (
    <div>
      <Route exact path="/docs" component={DocRoot} />

      <Route path="/docs/installing" render={() =>
        <DocSection title="Installing" content={docsInstalling}/>
      }/>

      <Route exact path="/docs/concepts" render={() =>
        <DocSection title="Concepts" content={docsConcepts} />} />

      <Route path="/docs/registry/:system" render={({ match }) => {
        let system = match.params.system;
        return systems.includes(system) ?
          <DocSection title={`Micrometer ${system[0].toUpperCase() + system.slice(1)}`}
                      content={docsBySystem[system]} /> :
          <Redirect to="/docs" />;
      }} />

      <Route path="/docs/ref/spring/1.5" render={() => <DocSection title="Spring Boot 1.5"
                                                                     content={docsSpring}
                                                                     attrs={{ version: '1.5' }} />} />
      <Route path="/docs/ref/spring/2.0" render={() => <DocSection title="Spring Boot 2.0"
                                                                     content={docsSpring}
                                                                     attrs={{ version: '2.0' }} />} />

      <Route path="/docs/ref/jvm" render={() =>
        <DocSection title="JVM and System Metrics" content={docsJvm}/>
      }/>

      <Route path="/docs/ref/cache" render={() =>
        <DocSection title="Cache Metrics" content={docsCache}/>
      }/>
    </div>
  )
}