import React from 'react'

const CampaignHistoryRow = ({ data, factions }) => {
  let attacker = factions[data.factions.attacker]
  let defender = factions[data.factions.defender]
  let background = (faction) => ({backgroundImage: `url(${faction.banner})`})

  return (
    <div className='campaign-history-row' style={{ border: '1px solid white' }}>
      <div className='history-header'>{data.sector}</div>
      <div className={'banner1 ' + ((data.info.winner === data.factions.defender) ? '' : 'grey')} style={background(defender)} />
      <div className={'banner2 ' + ((data.info.winner === data.factions.attacker) ? '' : 'grey')} style={background(attacker)} />
      <div className='history-info'>
        <div>
          {defender.name} attacked by {attacker.name}
        </div>
        <div className='date'>
          {data.info.date}
        </div>
        <div style={{ paddingTop: '10px' }}>
          {factions[data.info.winner].name} won:
          <ul>
            <li>{data.info.spoils}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CampaignHistoryRow
