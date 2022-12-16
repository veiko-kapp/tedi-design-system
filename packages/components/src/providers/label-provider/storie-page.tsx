import { ArgsTable, Primary, PRIMARY_STORY, Stories, Subtitle, Title } from '@storybook/addon-docs';

import VerticalSpacing from '../../components/vertical-spacing/vertical-spacing';

export const LabelProviderPage = (): JSX.Element => (
  <>
    <Title />
    <Subtitle>
      <>
        This component provides the labels helper function to other components via context api. Currently defined labels
        can be found <a href="/?path=/docs/documentation-labels--labels">here</a>
      </>
    </Subtitle>
    <Primary />
    <VerticalSpacing size={0.5}>
      <h2>Usage</h2>
      <h3>Provider</h3>
      <div>
        Wrap the provider around your app. <br />
        <pre>
          {'<LabelProvider labels={labels} locale={locale}>'}
          {'<YourApp />'}
          {'</LabelProvider>'}
        </pre>
      </div>
      <div>
        Labels is an object of key and value pairs. Keys should follow pattern:
        <ul>
          <li>{'<labelName>'}</li>
          <li>{'<componentName>.<labelName>'}</li>
        </ul>
        Values are either plain strings or some keys also support functions. Functions can be used for conditional
        translations like plurals.
      </div>
      <h3>Consumer</h3>
      <div>
        Use as hook: <br />
        <pre>
          {'const {getLabel} = useLabels();'}
          <br />
          {' const label = getLabel("someKey");'}
        </pre>
      </div>

      <div>
        Or wrap your component in the context consumer: <br />
        <pre>
          <span>{'<LabelContext.Consumer>'}</span>
          <br />
          <span>{' {(labels) => <Component someLabel={labels.getLabel("someKey")} />}'}</span>
          <br />

          <span>{'</LabelContext.Consumer>'}</span>
          <br />
        </pre>
      </div>
    </VerticalSpacing>

    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </>
);
