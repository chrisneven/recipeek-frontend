import React from 'react';
import { gql } from 'apollo-boost';
import { RecipesQuery } from '../generated/graphql';
import Spinner from './organisms/Spinner';
import { Icon, Card } from 'antd';
import { Link } from 'react-router-dom';
import Meta from 'antd/lib/card/Meta';
import styled from 'styled-components';
import { recipeFragment } from './Recipe';
import { useQuery } from 'react-apollo-hooks';

export const recipesQuery = gql`
    query Recipes {
        recipe {
            ...RecipeFragment
        }
    }
    ${recipeFragment}
`;

const RecipesWithHooks: React.FC = () => {
    const { data, error, loading } = useQuery<RecipesQuery>(recipesQuery);
    if (error || !data) {
        return null;
    }
    if (loading) {
        return <Spinner />;
    }

    return (
        <Container>
            {data.recipe.map(({ name, photo_url, description, id }) => (
                <StyledCard
                    key={id}
                    hoverable
                    cover={
                        <CardImage
                            alt={name}
                            src={
                                photo_url ||
                                'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                            }
                        />
                    }
                    actions={[
                        <Icon type="setting" />,
                        <Icon type="edit" />,
                        <Icon type="ellipsis" />
                    ]}
                >
                    <Link
                        to={`/recipe/${id}/`}
                    >
                        <Meta title={name} description={description} />
                    </Link>
                </StyledCard>
            ))}
        </Container>
    );
};

export default RecipesWithHooks;

const CardImage = styled.img`
    width: 100%;
    height: 20rem;
    object-fit: cover;
`;
const StyledCard = styled(Card)`
    width: calc(100vw - 1rem);
    margin-bottom: 1rem;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
