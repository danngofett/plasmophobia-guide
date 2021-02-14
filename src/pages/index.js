import React, { useState } from "react"
import Ghosts from '@data/ghosts'
import Evidence from '@data/evidence'
import { css } from '@emotion/react'

const pageStyles = css`
  color: #232129;
  font-family: -apple-system, Roboto, sans-serif, serif;
  margin: 0 auto;
  max-width: 1366px;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px;
  }

  @media (min-width: 1280px) {
    padding: 60px;
  }
`

const ghostCardGrid = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(6, 1fr);
  }
`

const ghostCard = css`
  border: thin solid #232129;
  padding: 20px;
`

const evidenceCardGrid = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const evidenceCardGridItem = css`
  padding: 0;
`

const evidenceCard = css`
  border: thin solid #232129;
  display: block;
  padding: 20px;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`

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
    <main css={pageStyles}>
      <title>Plasmophobia Hunter Guide</title>

      <h1>Plasmophobia Hunter Guide</h1>
      <p>A pocket guide to hunt down a ghost without going through the intuitive journal currently. This guide is also mobile friendly - so you can bookmark this to your phone whilst you play.</p>

      <div>
        <div>
          <h2>Evidence</h2>
          <button onClick={() => setActiveEvidence([])}>Reset</button>
        </div>

        <ul css={evidenceCardGrid}>
          {Evidence.data.map(({ id, name }) => (
            <li
              css={evidenceCardGridItem}
              key={id}
            >
              <button
                css={evidenceCard}
                onClick={() => handleEvidenceUpdate({ id, name })}
              >
                { name }
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Possible Ghosts</h2>
        <div css={ghostCardGrid}>
          {getAvailableGhost.length === 0
            ? (<p>There are no ghosts available found with this evidence!</p>)
            : getAvailableGhost.map((item) =>
            (
              <div
                css={ghostCard}
                key={item.name}
              >
                <h3>{item.name}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: getHighlightedEvidence(item.evidence)
                  }} />
              </div>
            )
          )}
        </div>
      </div>
    </main>
  )
}

export default IndexPage
