import React, { useState } from "react"
import Ghosts from '@data/ghosts'
import Evidence from '@data/evidence'

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const ghostCardGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
}

const ghostCard = {
  border: 'thin solid #232129',
  padding: '20px'
}

const IndexPage = () => {
  const [activeEvidence, setActiveEvidence] = useState([])

  /**
   * Check if evidence is already in active.
   * @param {number} id - The evidence id value.
   * @returns {boolean}
   */
  const evidenceIsActive = ({ id }) => {
    return activeEvidence.some(evidence => evidence.id === id)
  }

  /**
   * Handler remove evidence from state.
   * @param {number} id - The evidence id value.
   */
  const handleEvidenceRemove = ({ id }) => {
    setActiveEvidence(activeEvidence.filter((evidence) => evidence.id !== id))
  }

  /**
   * Handler to add and remove evidence from state.
   * @param {number} id - The evidence id value.
   * @param {string} name - The name of the evidence.
   */
  const handleEvidenceUpdate = ({ id, name }) => {
    if (evidenceIsActive({ id })) {
      setActiveEvidence(activeEvidence.filter((evidence) => evidence.id !== id))
      return
    }

    setActiveEvidence([
      ...activeEvidence,
      {
        id,
        name
      }
    ])
  }

  /**
   * Aggregate for returning available ghosts based on active evidence.
   * @returns {Object}
   */
  const availableEvidence = activeEvidence.map((evidence) => evidence.id)
  const getAvailableGhost = Ghosts.data.filter((ghost) => {
    return availableEvidence.every((evidence) => {
      return ghost.evidence.includes(evidence)
    })
  })

  /**
   * Returns an active evidence string with highlights.
   * @return {string}
   */
  const getHighlightedEvidence = (evidence) => {
    return evidence.map((item) => {
      if (availableEvidence.includes(item)) {
        return `<strong>${item}</strong>`
      }

      return item
    }).join(', ')
  }

  /**
   * Template.
   */
  return (
    <main style={pageStyles}>
      <title>Plasmophobia Hunter Guide</title>

      <h1>Plasmophobia Hunter Guide</h1>
      <p>A pocket guide to hunt down a ghost without going through the intuitive journal currently. This guide is also mobile friendly - so you can bookmark this to your phone whilst you play.</p>

      <div>
        <h2>Active Evidence</h2>
        {
          activeEvidence.length === 0
          ? (<p>There are currently no active evidence.</p>)
          : (
            <ul>
              {activeEvidence.map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span>
                  <button onClick={() => handleEvidenceRemove({ id: item.id })}>
                    Remove
                  </button>
                </li>))}
            </ul>)
        }
      </div>

      <div>
        <h2>Possible Ghosts</h2>
        <div style={ghostCardGrid}>
          {getAvailableGhost.length === 0 ? (
            <p>There are no ghosts available found with this evidence!</p>
          ) : getAvailableGhost.map((item) => (
            <div style={ghostCard} key={item.name}>
              <h3>{item.name}</h3>
              <div dangerouslySetInnerHTML={{ __html: getHighlightedEvidence(item.evidence) }} />
            </div>
          )
          )}
        </div>
      </div>

      <div>
        <h2>Evidence</h2>
        <ul>
          {Evidence.data.map(({ id, name }) => (
            <li key={id}>
              <button onClick={() => handleEvidenceUpdate({ id, name })}>
                { name }
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default IndexPage
